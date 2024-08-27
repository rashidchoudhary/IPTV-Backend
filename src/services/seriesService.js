import mongoose from "mongoose";
import { seriesModel } from "../models/seriesModel.js";
import { genreSeriesModel } from "../models/genreSeriesModel.js";
import { fileModel } from "../models/index.js";
import fs from 'fs';
import path from 'path';

export const seriesService = {
  getAll: async (page, limit, sortBy, order) => {
    const skip = (page - 1) * limit;
    let sortOrder;
    if (order === "asc") {
      sortOrder = 1;
    } else {
      sortOrder = -1;
    }
    const data = await seriesModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return data;
  },
  getById: async (id) => {
    return seriesModel.findById(id);
  },
  add: async (data, file) => {
    const { name, description } = data;
    let { genre_ids } = data;

    // Check if genre_ids is an array containing a string
    if (Array.isArray(genre_ids) && genre_ids.length === 1 && typeof genre_ids[0] === 'string') {
        try {
            // Extract the string from the array and parse it
            genre_ids = JSON.parse(genre_ids[0]);
        } catch (err) {
            throw new Error('Invalid genre_ids format');
        }

        // Check if parsed genre_ids is an array
        if (Array.isArray(genre_ids)) {
            try {
                // Convert each genre_id to ObjectId
                genre_ids = genre_ids.map(id => mongoose.Types.ObjectId(id));
            } catch (err) {
                throw new Error('Invalid ObjectId format in genre_ids');
            }
        } else {
            throw new Error('genre_ids must be an array');
        }
    } else {
        throw new Error('Invalid genre_ids format');
    }

    // Handle file upload
    const fileData = await fileModel.create({
        original_name: file.originalname,
        current_name: file.filename,
        type: file.mimetype,
        path: file.path,
        size: file.size,
    });

    // Create the series document
    const series = await seriesModel.create({
        name,
        description,
        trailer_id: fileData._id,
        thumbnail_id: fileData._id,
    });

    // Handle genre-series mapping
    if (genre_ids && genre_ids.length > 0) {
        const genreSeriesData = genre_ids.map((genreId) => ({
            genre_id: genreId,
            series_id: series._id,
        }));
        await genreSeriesModel.insertMany(genreSeriesData);
    }

    return series;
},

update: async (id, data, file) => {
    const { name, description } = data;
    let { genre_ids } = data;

    // Handle genre_ids conversion
    if (Array.isArray(genre_ids) && genre_ids.length === 1 && typeof genre_ids[0] === 'string') {
        try {
            genre_ids = JSON.parse(genre_ids[0]);
            genre_ids = genre_ids.map(id => mongoose.Types.ObjectId(id));
        } catch (err) {
            throw new Error('Invalid genre_ids format');
        }
    } else if (!Array.isArray(genre_ids)) {
        throw new Error('Invalid genre_ids format');
    }

    // Find the existing series to get the old file IDs
    const existingSeries = await seriesModel.findById(id);
    if (!existingSeries) {
        throw new Error('Series not found');
    }

    const updatedData = {
        name,
        description,
    };

    // Handle file upload
    if (file) {
        // Get the old file details
        const oldFile = await fileModel.findById(existingSeries.thumbnail_id);

        // Delete the old file from the public folder
        if (oldFile && oldFile.path) {
            const oldFilePath = path.join(process.cwd(), oldFile.path);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        // Delete the old file record from the database
        await fileModel.findByIdAndDelete(existingSeries.thumbnail_id);

        // Save the new file to the database
        const fileData = await fileModel.create({
            original_name: file.originalname,
            current_name: file.filename,
            type: file.mimetype,
            path: file.path,
            size: file.size,
        });

        updatedData.trailer_id = fileData._id;
        updatedData.thumbnail_id = fileData._id;
    }

    // Update the series document
    const series = await seriesModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Update genre-series mapping if necessary
    if (genre_ids && genre_ids.length > 0) {
        await genreSeriesModel.deleteMany({ series_id: id });

        const genreSeriesData = genre_ids.map((genreId) => ({
            genre_id: genreId,
            series_id: series._id,
        }));
        await genreSeriesModel.insertMany(genreSeriesData);
    }

    return series;
},

  delete: async (id) => {
    // Find the series by ID
    const series = await seriesModel.findById(id);
    if (!series) {
      throw new Error('Series not found');
    }

    // Get the trailer_id
    const trailerId = series.trailer_id;

    // Delete the file associated with trailer_id from the fileModel
    const fileData = await fileModel.findByIdAndDelete(trailerId);
    if (fileData) {
      // Construct the file path
      const filePath = path.join("public", fileData.current_name);

      // Delete the file from the directory
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", filePath);
        }
      });
    }

    // Delete the series from the seriesModel
    await seriesModel.findByIdAndDelete(id);

    // Delete related genreSeries
    await genreSeriesModel.deleteMany({ series_id: id });

    // Delete related seasons
    await seasonModel.deleteMany({ series_id: id });

    return series;
  },
  getAllSeasonsOfSeriesBySeriesId: async (id) => {
    return seriesModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id)
				},
			},
			{
				$lookup: {
					from: "seasons",
					localField: "_id",
					foreignField: "series_id",
					as: "seasons",
				},
			},
      {
        $unwind: "$seasons",
      },
		])
  },
  getAllEpisodesOfSeriesBySeriesId: async (id) => {
    return seriesModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "series_id",
          pipeline: [
            {
            $lookup: {
              from: "episodes",
              localField: "_id",
              foreignField: "season_id",
              as: "episodes",
            },
            },
            {
              $unwind: "$episodes"
            }
          ],
          as: "seasons",
          },
      },
      {
        $unwind: "$seasons",
      }
    ]);
  },
};
