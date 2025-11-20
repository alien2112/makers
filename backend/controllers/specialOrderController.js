const SpecialOrder = require('../models/SpecialOrder');

exports.createSpecialOrder = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      products,
      notes
    } = req.body;

    if (!firstName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required'
      });
    }

    const sanitizedProducts = (products || [])
      .filter(product => product?.name?.trim())
      .map(product => ({
        name: product.name.trim(),
        quantity: product.quantity || 1,
        targetPrice: product.targetPrice,
        referenceUrl: product.referenceUrl
      }));

    if (sanitizedProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    const specialOrder = await SpecialOrder.create({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      products: sanitizedProducts,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Special order submitted successfully',
      data: specialOrder
    });
  } catch (error) {
    next(error);
  }
};



