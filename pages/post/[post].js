import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../componentes/Header.js'
import { useState } from 'react';

export default function Post({post}) { 


  function isEmpty(obj) {

    for(var prop in obj) {
  
      if(obj.hasOwnProperty(prop)) {
  
        return false;
  
      }
  
    }

  }



  let showdown  = require('showdown')

  let converter = new showdown.Converter()

  let conteudo = converter.makeHtml(post[0].conteudo)

  const [ConteudoPost] = useState(conteudo)

  const DataSplit = post[0].createdAt.split('T')

  const DataArr = DataSplit[0].split('-')

  const [data] = useState(`${DataArr[2]+'/'+DataArr[1]+'/'+DataArr[0]}`)

  const [TituloPost] = useState(post[0].titulo)

  const [thumb] = useState(((post[0].thumbnail.length) >= 1)? post[0].thumbnail[0].url: undefined)


  return (
    <div className={styles.container}>
      <Head>
        <title>Rafael Tavares Juliani</title>
        <link rel="icon" href="/img/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Roboto:ital@0;1&display=swap" rel="stylesheet"></link>
      </Head>

      <Header />

      <main className={styles.main}>

        <div className={styles.grid}>

          {TituloPost?

                    
                <div className={styles.cardPostUnico}>


                      <h1>{TituloPost}</h1>

                      <div className={styles.data}>{data}</div>



                      {thumb ? <a href={'http://localhost:1337'+thumb} target='blank'><img className={styles.capa} src={'http://localhost:1337'+thumb} alt={TituloPost} /></a> :null}


                      <div className={styles.conteudo} dangerouslySetInnerHTML={{__html: ConteudoPost }}>


                      </div>

                  </div>

        

  

            :null

          }
       
        </div>


      </main>

      <footer className={styles.footer}>
        
        <span className={styles.preto}>Rafael Tavares Juliani</span> <br />
        <span><a className={styles.preto} href='mailto:professor@rafaeljuliani.com' >e-mail: professor@rafaeljuliani.com</a></span> <br />
        
      </footer>

    </div>
  )
}


export async function getStaticPaths() {
    
    const res = await fetch('https://rafaeljuliani-backend.herokuapp.com/posts')
    const posts = await res.json()
  
   
    const paths = posts.map(post => `/post/${post.url}`)
  
  
    return { paths, fallback: false }
  }

export async function getStaticProps(ctx) {
   

    const res = await fetch(`https://rafaeljuliani-backend.herokuapp.com/posts?url=${ctx.params.post}`)
    const post = await res.json()
  
    
    return {
      props: {
        post,
      },
    }
  }
  