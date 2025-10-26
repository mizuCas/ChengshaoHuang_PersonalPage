import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import RecentPosts from '@/components/RecentPosts'
import HobbiesPreview from '@/components/HobbiesPreview'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <RecentPosts />
      <HobbiesPreview />
    </div>
  )
}
