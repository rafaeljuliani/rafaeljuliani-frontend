import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children, as }) => {
  
  const router = useRouter();

  let id = children.props.id; //pegando o id da tag a

  let LivroCapitulo = '/'+router.query.livro+'/'+router.query.capitulo;//pegando livro e capitulo

  let className = children.props.className || ''; //pegando a classe da tag a

  if(router.query.livro){//verificar se está no leitor ou nas páginas do site

      if (LivroCapitulo === as) {

        //className = `${className} Selecionado`; 

      }

        return <Link href={href} as={as}>{React.cloneElement(children, { className, id })}</Link>


    } else {

      if (router.pathname === href) {

        className = `${className} SelecionadoSite`;

      }

      return <Link href={href} >{React.cloneElement(children, { className, id })}</Link>

    }

}