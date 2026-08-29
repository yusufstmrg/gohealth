import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import crypto from 'crypto';
import {q,one} from '@/lib/db';
const hash=(s:string)=>crypto.createHash('sha256').update(s).digest('hex');
async function admin(){const raw=(await cookies()).get('gh_session')?.value;if(!raw)return null;return one<any>('select u.id,u.email,u.full_name,u.role from sessions s join users u on u.id=s.user_id where s.token_hash=$1 and s.expires_at>now()',[hash(raw)])}
export async function GET(){const u=await admin();const allowed=process.env.GOHEALTH_ADMIN_EMAIL?u?.email?.toLowerCase()===process.env.GOHEALTH_ADMIN_EMAIL.toLowerCase():u?.role==='admin';if(!allowed)return NextResponse.json({error:'Forbidden'},{status:403});const [users,bookings,providers,blood,partners]=await Promise.all([one<any>('select count(*)::int n from users'),one<any>('select count(*)::int n from bookings'),one<any>('select count(*)::int n from providers'),one<any>('select count(*)::int n from blood_requests'),one<any>('select count(*)::int n from partner_applications')]);return NextResponse.json({user:u,metrics:{users:users.n,bookings:bookings.n,providers:providers.n,bloodRequests:blood.n,partnerApplications:partners.n}})}
