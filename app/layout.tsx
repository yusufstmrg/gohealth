import type {Metadata} from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata:Metadata={
  title:'GoHealth — One Platform, Every Health Need',
  description:"GoHealth is Indonesia's digital health access, navigation, discovery and orchestration platform.",
};

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="id"><body>
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand brand-image" href="/" aria-label="GoHealth home">
          <Image src="/brand/gohealth-approved-inspired.svg" alt="GoHealth — One Platform, Every Health Need" width={132} height={44} priority />
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/services">Services</Link>
          <Link href="/providers">Providers</Link>
          <Link href="/blood">Blood</Link>
          <Link href="/emergency">Emergency</Link>
          <Link href="/hub">Health Hub</Link>
          <Link href="/assistant">GoHealth AI</Link>
          <Link href="/journey">My Journey</Link>
          <Link href="/partners">Partners</Link>
        </nav>
        <div style={{display:'flex',gap:8}}>
          <Link className="btn secondary" href="/account">Account</Link>
          <Link className="btn primary" href="/auth">Get Started</Link>
        </div>
      </div>
    </header>
    {children}
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link className="brand brand-image" href="/" aria-label="GoHealth home">
            <Image src="/brand/gohealth-approved-inspired.svg" alt="GoHealth" width={150} height={50}/>
          </Link>
          <p style={{color:'rgba(255,255,255,.68)',lineHeight:1.7,fontSize:13,maxWidth:360}}>Satu platform untuk semua kebutuhan kesehatan. Access • Trust • Care.</p>
        </div>
        <div><h4>Platform</h4><div className="space"><Link href="/services">Services</Link><Link href="/providers">Providers</Link><Link href="/journey">My Journey</Link><Link href="/assistant">GoHealth AI</Link></div></div>
        <div><h4>Ecosystem</h4><div className="space"><Link href="/blood">Blood Access</Link><Link href="/emergency">Emergency</Link><Link href="/hub">Health Hub</Link><Link href="/partners">Partners</Link></div></div>
        <div><h4>Trust</h4><div className="space"><Link href="/trust">Trust Center</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/medical-disclaimer">Medical Disclaimer</Link></div></div>
      </div>
      <div className="container legal">GoHealth adalah platform akses, navigasi, discovery, dan orchestration. GoHealth bukan pengganti dokter, rumah sakit, BPJS, SATUSEHAT, PMI, atau layanan darurat. Data bertanda Demo adalah data ilustratif sampai partner resmi terhubung.</div>
    </footer>
  </body></html>
}