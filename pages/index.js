import Head from 'next/head'
import Link from '../componentes/Link.js'
import styles from '../styles/Home.module.css'
import Header from '../componentes/Header.js'
import { useState,  useEffect } from 'react';
const axios = require("axios")

export default function Home() {


  let showdown  = require('showdown')

  let converter = new showdown.Converter()

  const [posts, setPosts] = useState([])


  useEffect(() => {


    const source = axios.CancelToken.source();
       
  
    axios({

      url: 'http://localhost:1337/posts',
      method: 'get',
      
    }).then((result) => { 
  
     
      setPosts(() => result.data); 
    
      
    }).catch(err => {
    
      console.log(err)
      
    });
    

  
    return () => {
  
      source.cancel()
  
    }
  
  
  
  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>Rafael Tavares Juliani</title>
        <link rel="icon" href="/img/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Roboto:ital@0;1&display=swap" rel="stylesheet"></link>
        <meta name="description" content="Apenas um site de Rafael Tavares Juliani e suas ideias."></meta>
      </Head>

      <Header />

      <main className={styles.main}>
        <img src='img/LogoIndexRafaelJuliani.png' className={styles.logo}  alt="Logo Rafael Tavares Juliani com uma foto dele e círculos azuis formando efeito doppler em movimento para esquerda e escrito 'Rafael' grande com detalhes azul e amarelo no primeiro e segundo 'a' respectivamente. E, em letras menores, escrito 'Tavares Juliani' na parte de cima entre o 'f' e o 'l'."   />

        <div className={styles.grid}>

          {posts.length >= 1?

            posts.slice(0).reverse().map((post, index) => {

              let DateTimeArr = post.createdAt.split('T')

              let DateArr = DateTimeArr[0].split('-')

              let resumo = post.resumo

              resumo = resumo+'... &rarr; veja mais'

              resumo = converter.makeHtml(resumo)

              return (
                    
                  <Link href={`/post/${post.url}`} key={index} ><a className={styles.card}>


                      <h2>{`${post.titulo}`}</h2>

                      <div className={styles.data}>{`${DateArr[2]+'/'+DateArr[1]+'/'+DateArr[0]}`}</div>


                      {post.thumbnail[0]? <img className={styles.thumb} src={'http://localhost:1337'+post.thumbnail[0].url} alt={post.titulo} /> :null}


                      <div className={styles.conteudo} dangerouslySetInnerHTML={{__html: resumo }}>


                      </div>

                  </a></Link>

              )

            })

  

            :null

          }
       
        </div>


      </main>

      <footer className={styles.footer}>
        
        <span className={styles.preto}>Rafael Tavares Juliani</span> <br />
        <a className={styles.preto} href='mailto:professor@rafaeljuliani.com' >E-mail: professor@rafaeljuliani.com</a>

        
      </footer>
    </div>
  )
}
