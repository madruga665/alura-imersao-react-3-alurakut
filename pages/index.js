import { useState, useEffect } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

function ProfileSidebar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }} />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}>`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual}.title`} key={itemAtual.title}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([
    {
      id: "321321654784",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);

  const githubUser = "madruga665";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];
  const [seguidores, setSeguidores] = useState([]);
  useEffect(function() {
    fetch("https://api.github.com/users/madruga665/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className='title'>
              <Box>Bem Vindo(a)</Box>
              <OrkutNostalgicIconSet />
            </h1>
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCriaComunidade(event) {
                event.preventDefault();
                const dadosDoForm = new FormData(event.target);
                const comunidade = {
                  id: new Date().toISOString(),
                  titulo: dadosDoForm.get("title"),
                  image: dadosDoForm.get("image"),
                };
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              }}
            >
              <div>
                <input
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input
                  placeholder='Coloque uma URL para usarmos de capa'
                  name='image'
                  aria-label='Coloque uma URL para usarmos de capa'
                  type='text'
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBox title='Seguidores' items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual}.title`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
