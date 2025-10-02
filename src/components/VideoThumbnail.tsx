import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

interface VideoThumbnailProps {
  videoUrl: string;
  title: string;
  className?: string;
}

const VideoThumbnail = ({ videoUrl, title, className = '' }: VideoThumbnailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract video ID from YouTube URL to get thumbnail
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '/placeholder.svg';

  return (
    <>
      <div 
        className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      </div>
      
      <VideoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
        title={title}
      />
    </>
  );
};

export default VideoThumbnail;
