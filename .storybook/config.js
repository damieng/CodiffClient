import { configure } from '@kadira/storybook';
import '../src/bootstrap/css/bootstrap.css';
import '../src/bootstrap/css/bootstrap-theme.css';

function loadStories() {
  require('../src/components/stories');
}

configure(loadStories, module);
