import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'

export async function getStaticPaths() {
    const filesInProjects = fs.readdirSync('./content/blogs')
    const paths = filesInProjects.map(file => {
      const filename = file.slice(0, file.indexOf('.'))
      return { params: { slug: filename }}
    })
  
    return {
      paths,
      fallback: false // This shows a 404 page if the page is not found
    }
  }

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(fs.readFileSync(`./content/blogs/${slug}.md`, 'utf8'))
  let frontmatter = fileContent.data
  const markdown = fileContent.content

  return {
    props: { frontmatter, markdown }
  }
}

export default function Blog({ frontmatter, markdown}) {

  console.log( markdown)

    return (
      <>
        <Head>
          <title>Eat the Strip | {frontmatter.title}</title>
        </Head>
        <div style={{backgroundImage: `url(${frontmatter.thumbnail})`, backgroundSize: `cover`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', height: '50vh', width: '100%'}}></div>
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <hr />
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      </>
    )
  }