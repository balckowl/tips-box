import About from '@/components/welcome/about';
import Hero from '@/components/welcome/hero';
import HowTo from '@/components/welcome/howTo/how-to';
import Start from '@/components/welcome/start';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <HowTo />
      <Start />
    </div>
  );
}
