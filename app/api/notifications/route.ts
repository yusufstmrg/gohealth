import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import crypto from 'crypto';
import {q,one} from '@/lib/db';
const hash=(s:string)=>crypto.createHash('sha256').update(s).digest('hex');
async function user(){const raw=(await cookies()).get('gh_session')?.value;if(!raw)return null;return one<any>('select u.id from sessions s join users u on u.id=s.user_id where s.token_hash=$1 and s.expires_at>now()',[hash(raw)])}
export async function GET(){const u=await user();if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json({items:await q('select * from notifications where user_id=$1 order by created_at desc limit 50',[u.id])})}
export async function POST(){const u=await user();if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});await q('update notifications set read=true where user_id=$1',[u.id]);return NextResponse.json({ok:true})}
