import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    if (evt.type === 'user.created') {
      try {
        // if (evt.data.first_name && evt.data.last_name) {
        await prisma.user.create({
          data: {
            email: evt.data.email_addresses[0].email_address,
            imageUrl: evt.data.image_url,
            name:
              evt.data.first_name && evt.data.last_name
                ? `${evt.data.first_name} ${evt.data.last_name}`.trim()
                : 'Invited User',
            clerkUserId: evt.data.id,
            // id will be auto-generated as UUID
            // createdAt and updatedAt will be handled automatically
          },
        })
        // } else {
        //   throw new Error('User has no first or last name')
        // }
        console.log('Successfully created user in database')
      } catch (dbError) {
        console.error('Database error:', dbError)
        return new Response('Database error', { status: 500 })
      }
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response('Error processing webhook', { status: 400 })
  }
}
