import SedoBanner from './SedoBanner';

interface BlogAdStripProps {
  position: 'top' | 'bottom';
  slug?: string;
}

const BlogAdStrip = ({ position, slug = 'default' }: BlogAdStripProps) => {
  return (
    <div className={`container mx-auto px-4 flex justify-center ${position === 'top' ? 'pt-6' : 'py-10'}`}>
      <SedoBanner size="728x90" seed={`${slug}-${position}`} className="hidden md:inline-block" />
      <SedoBanner size="336x280" seed={`${slug}-${position}-m`} className="md:hidden" />
    </div>
  );
};

export default BlogAdStrip;
