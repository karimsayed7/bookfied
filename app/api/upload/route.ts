import {NextResponse} from "next/server";
import {handleUpload, HandleUploadBody} from "@vercel/blob/client";
import {auth} from "@clerk/nextjs/server";
import {MAX_FILE_SIZE} from "@/lib/constants";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = (await request.json()) as HandleUploadBody;

       const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                let userId: string | null = null;
                try {
                    const authResult = await auth();
                    userId = authResult.userId;
                } catch (authError) {
                    // Surface auth() failures distinctly from a missing userId,
                    // since both were previously indistinguishable in the logs.
                    console.error('auth() threw inside onBeforeGenerateToken:', authError);
                    throw new Error(
                        `AuthCheckFailed: ${authError instanceof Error ? authError.message : String(authError)}`,
                    );
                }

                if(!userId) {
                    throw new Error('Unauthorized: User not authenticated');
                }

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    addRandomSuffix: true,
                    maximumSizeInBytes: MAX_FILE_SIZE,
                    tokenPayload: JSON.stringify({ userId })
                }
        } ,
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('File uploaded to blob: ', blob.url)

                const payload = tokenPayload ? JSON.parse(tokenPayload): null
                const userId = payload?.userId;

                // TODO: PostHog
            }
        });

        return NextResponse.json(jsonResponse)
    } catch (e) {
        const message = e instanceof Error ? e.message : "An unknown error occurred";
        const status = message.includes('Unauthorized') ? 401 : 500;
        console.error('Upload error', e);
        // TEMP: return the real error message to the client so we can diagnose
        // the production 500 without needing direct access to Vercel's log UI.
        // Revert this to a generic 'Upload failed' message once the root cause
        // is confirmed and fixed — never ship raw internal error text long-term.
        const clientMessage = status === 401 ? 'Unauthorized' : `Upload failed: ${message}`;
        return NextResponse.json({ error: clientMessage }, { status });
    }
}