import { CanIt } from '@can-it/core-local';

const canIt = new CanIt({
  allow: [
    ['view', 'documents'],
    ['edit', 'documents']
  ],
  deny: [
    ['edit', 'documents']
  ]
});

console.log(canIt.allowTo('edit', 'documents'));
console.log(canIt.allowTo('view', 'documents'));
