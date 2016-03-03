import { subscribeToProject } from './Projects';

export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_REPOSITORY':
      return [...state, action.repository];
    case 'ADD_PROJECTS': {
      const { repository, projects } = action.payload;
      const newRepository = {
        ...repository,
        projects
      };

      return state.map(repo => {
        if(repo.id === repository.id) {
          return newRepository;
        }

        return repo;
      });
    }
    case 'CREATE_PROJECT': {
      return state;
    }
    case 'CREATED_PROJECT': {
      const { repository, project } = action.payload;

      const newRepository = {
        ...repository,
        projects: [project, ...repository.projects]
      };

      return state.map(r => {
        if(r.id === repository.id)
          return newRepository;

        return r;
      });
    }
    default:
      return state;
  }
}

export function createProject(repository, project) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_PROJECT', payload: { repository, project } });

    const createProjectPayload = {
      name: repository.name,
      origin: repository.origin
    };

    fetch('https://codiff-api.intracia.com/v1/projects', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createProjectPayload)
    }).then((response) => {
      return response.json();
    }).then((createdProject) => {
      const newProject = {
        id: createdProject.id,
        name: createdProject.name,
        createdBy: 'gisenberg',
        logoUrl: 'http://lorempixum.com/128/128',
        popularity: 0.0,
        isPrivate: false,
        isJoining: false,
        hasJoined: true
      };

      dispatch({ type: 'CREATED_PROJECT', payload: { repository, project: newProject } });
      subscribeToProject(repository, newProject)(dispatch);
    });
  };
}

export function joinProject(repository, project) {
  return subscribeToProject(repository, project);
}

export function addRepository(repository) {
  return (dispatch) => {
    dispatch({ type: 'ADD_REPOSITORY', repository });
    fetch(`https://codiff-api.intracia.com/v1/projects/search?origin=${encodeURIComponent(repository.origin)}`)
      .then((response) => {
        return response.json();
      }).then((results) => {
        const projects = results.items.map(project => ({
          id: project.id,
          name: project.name,
          createdBy: 'gisenberg',
          logoUrl: 'http://lorempixum.com/128/128',
          popularity: 0.0,
          isPrivate: false,
          isJoining: false,
          hasJoined: false
        }));

        dispatch({ type: 'ADD_PROJECTS', payload: { repository, projects } });
      });
  };
}
