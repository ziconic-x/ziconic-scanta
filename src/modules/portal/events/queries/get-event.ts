import prisma from '@/lib/db'

export type Event = Awaited<ReturnType<typeof getEvent>>

export const getEvent = async (eventId: string) => {
  try {
    return await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        qrCodes: true,
      },
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
