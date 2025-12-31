import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary will automatically read from CLOUDINARY_URL in process.env
cloudinary.config({
    secure: true
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const results = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'hayya-living-uploads', // Folder in Cloudinary
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
            ).end(buffer);
        });

        // @ts-ignore
        return NextResponse.json({ success: true, url: results.secure_url });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
