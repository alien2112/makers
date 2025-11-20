/**
 * @desc    Upload product image(s)
 * @route   POST /api/upload/product
 * @access  Private/Admin
 */
exports.uploadProductImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }

    // Generate URLs for uploaded files
    const imageUrls = req.files.map(file => ({
      url: `/uploads/products/${file.filename}`,
      alt: req.body.alt || 'Product image'
    }));

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: imageUrls
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload single image
 * @route   POST /api/upload/single
 * @access  Private/Admin
 */
exports.uploadSingleImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    next(error);
  }
};
