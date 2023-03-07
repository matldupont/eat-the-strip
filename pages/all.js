import dynamic from 'next/dynamic'
import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

export async function getStaticProps() {
  const blogFiles = fs.readdirSync('./content/blogs')

  const blogs = blogFiles.map((filename) => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8')
    const matterData = matter(file)

    return {
      ...matterData.data,
      slug: filename.slice(0, filename.indexOf('.')),
    }
  })
  return {
    props: {
      blogs,
    },
  }
}

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
})

const AllRestaurants = ({ blogs }) => {
  const coordinatesArray = blogs.map((blog) => ({
    name: blog.title,
    coordinates: [blog.positives, blog.negatives],
  }))
  return (
    <>
      <div>
        <MapWithNoSSR coordinates={coordinatesArray} />
      </div>
    </>
  )
}

export default AllRestaurants
