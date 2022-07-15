const {createSubscribable} = require('../build');

let sub = createSubscribable();
let unsub = sub.subscribe((message) => {
  console.log(message);
});

for (let i = 0; i < 10; i++) {
  sub.publish('' + i);
}
unsub();

sub.publish('Hey'); // should not log
