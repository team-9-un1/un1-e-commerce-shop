const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBanners = async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBannerByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const banner = await prisma.banner.findUnique({
      where: { key }
    });
    
    if (!banner || !banner.isActive) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    return res.status(200).json(banner);
  } catch (error) {
    console.error('Error fetching banner by key:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBanner = async (req, res) => {
    try {
        const { key, title, imageUrl, linkUrl } = req.body;
        
        if (!key || !imageUrl) {
            return res.status(400).json({ message: 'Key and ImageURL are required' });
        }

        const banner = await prisma.banner.create({
            data: { key, title, imageUrl, linkUrl }
        });

        return res.status(201).json(banner);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'A banner with this key already exists' });
        }
        console.error('Error creating banner:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
  getBanners,
  getBannerByKey,
  createBanner
};
