import './dom/dom';
import './card/app';

import { registerCustomCard } from './utils/register';

registerCustomCard({
  type: 'todo-plus-card',
  name: 'Todo Plus Card',
  description: 'Manage to-do tasks with start date, priority and recurrence.',
});

console.info('%c todo-plus-card %c loaded ', 'background:#03a9f4;color:#fff', '');
