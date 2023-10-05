import createError from 'http-errors';
import { Request, Response } from 'express';
import { createVendorInput } from '../interface/index';
import { Vendor } from '../models/index';
import { generatePassword, generateSalt, handleErrors } from '../utils/index';

const findVendor = async (id: string | undefined, email?: string) => {
  try {
    const vendor = await Vendor.findOne({
      $or: [
        { _id: id },
        { email: email },
      ],
    });

    if (!vendor) {
      throw createError(404, 'No vendor found');
    }

    return vendor;
  } catch (error) {
    throw error;
  }
};

const createVendor = async (req: Request, res: Response) => {
  const vendor: createVendorInput = req.body;

  try {
    const existingVendor = await findVendor(undefined, vendor.email)

    if (existingVendor) {
      throw createError(409, `${vendor.email} is already registered`);
    }

    const salt = await generateSalt();
    const hashedPassword = await generatePassword(vendor.password, salt);

    const createdVendor = await Vendor.create({
      ...vendor,
      password: hashedPassword,
      salt: salt,
    });

    return res.status(201).json({
      success: true,
      data: createdVendor,
    });
  } catch (error) {
    return handleErrors(error, res);
  }
};

const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find();

    if (!vendors.length) {
      throw createError(404, 'No vendors found');
    }

    return res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    return handleErrors(error, res);
  }
};

const getVendorById = async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    const vendorData = await findVendor(String(id));

    if (!vendorData) {
      throw createError(404, 'No vendor found');
    }

    return res.status(200).json({
      success: true,
      data: vendorData,
    });
  } catch (error) {
    return handleErrors(error, res);
  }
};

export { findVendor, createVendor, getVendors, getVendorById };
