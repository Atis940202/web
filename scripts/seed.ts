import { PrismaClient } from "@prisma/client";
import data from "../data/videos.json" assert { type: "json" };

const prisma = new PrismaClient();

type Video = (typeof data)[number];

async function run() {
  await prisma.tag.deleteMany();
  await prisma.video.deleteMany();

  for (const video of data as Video[]) {
    const createdVideo = await prisma.video.create({
      data: {
        slug: video.slug,
        title: video.title,
        description: video.description,
        youtubeId: video.youtubeId,
        channelTitle: video.channelTitle,
        publishedAt: new Date(video.publishedAt),
        duration: video.duration,
        thumb: video.thumb,
        heroThumb: video.heroThumb,
        year: video.year,
        featured: video.featured
      }
    });

    for (const tag of video.tags) {
      await prisma.tag.upsert({
        where: { name: tag },
        create: { name: tag, videos: { connect: { id: createdVideo.id } } },
        update: { videos: { connect: { id: createdVideo.id } } }
      });
    }
  }

  console.log("Seed completed");
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
