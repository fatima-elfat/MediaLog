import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMediaLogs = async (req, res) => {
  try {
    const mediaLogs = await prisma.mediaLog.findMany({
      where: { clientId: req.userId },
      include: {
        tvShow: true,
        movie: true,
        book: true,
        podcast: true,
      },
    });
    res.json(mediaLogs);
  } catch (error) {
    console.error('Get media logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMediaLog = async (req, res) => {
  try {
    const { id } = req.params;
    const mediaLog = await prisma.mediaLog.findUnique({
      where: { id },
      include: {
        tvShow: true,
        movie: true,
        book: true,
        podcast: true,
      },
    });

    if (!mediaLog || mediaLog.clientId !== req.userId) {
      return res.status(404).json({ message: 'Media log not found' });
    }

    res.json(mediaLog);
  } catch (error) {
    console.error('Get media log error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createMediaLog = async (req, res) => {
  try {
    const {
      title,
      mediaType,
      status,
      currentProgress,
      notes,
      tvShow,
      movie,
      book,
      podcast,
    } = req.body;

    const mediaLog = await prisma.mediaLog.create({
      data: {
        title,
        mediaType,
        status,
        currentProgress,
        notes,
        clientId: req.userId,
        tvShow: tvShow ? { create: tvShow } : undefined,
        movie: movie ? { create: movie } : undefined,
        book: book ? { create: book } : undefined,
        podcast: podcast ? { create: podcast } : undefined,
      },
    });

    res.status(201).json(mediaLog);
  } catch (error) {
    console.error('Create media log error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMediaLog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      mediaType,
      status,
      currentProgress,
      notes,
      tvShow,
      movie,
      book,
      podcast,
    } = req.body;

    const mediaLog = await prisma.mediaLog.findUnique({
      where: { id },
    });

    if (!mediaLog || mediaLog.clientId !== req.userId) {
      return res.status(404).json({ message: 'Media log not found' });
    }

    const updatedMediaLog = await prisma.mediaLog.update({
      where: { id },
      data: {
        title,
        mediaType,
        status,
        currentProgress,
        notes,
        tvShow: tvShow ? { update: tvShow } : undefined,
        movie: movie ? { update: movie } : undefined,
        book: book ? { update: book } : undefined,
        podcast: podcast ? { update: podcast } : undefined,
      },
    });

    res.json(updatedMediaLog);
  } catch (error) {
    console.error('Update media log error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMediaLog = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaLog = await prisma.mediaLog.findUnique({
      where: { id },
    });

    if (!mediaLog || mediaLog.clientId !== req.userId) {
      return res.status(404).json({ message: 'Media log not found' });
    }

    await prisma.mediaLog.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete media log error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
