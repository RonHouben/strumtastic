import Image from "next/image";
import guitarAmp from '../../public/images/guitar-amp.svg';
import { H1 } from 'ui/components/Typography/Headings/H1';

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
			<div className="flex-col">
				<Image alt='guitar amp' src={guitarAmp} />
				<H1>May I plug into your amp?</H1>
      </div>
    </div>
  );
}
