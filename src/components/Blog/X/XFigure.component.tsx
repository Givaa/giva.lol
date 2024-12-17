import Image from 'next/image';

interface XFigureProps {
	alt?: string;
	caption?: string;
	src: string;
}

export function XFigure({ alt, caption, src }: XFigureProps): JSX.Element {
	return (
		<figure>
			<Image
				alt={alt ?? caption}
				className="rounded-3xl object-cover select-none hover:shadow-xl"
				draggable={false}
				src={src}
				layout="responsive" // Per layout responsivo
				width={16} // Rapporto larghezza
				height={9} // Rapporto altezza
			/>
			<figcaption>{alt ?? caption}</figcaption>
		</figure>
	);
}

