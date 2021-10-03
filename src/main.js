// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default async function main(game, start) {
  let x = start.x;
  let y = start.y;

  const lab = [{ x: x, y: y }];
  let point;

  const stepUp = async () => {
    await game.up(x, y);
    y--;
    point.goneTop = true;
  };
  const stepDown = async () => {
    await game.down(x, y);
    y++;
    point.goneBottom = true;
  };
  const stepRight = async () => {
    await game.right(x, y);
    x++;
    point.goneRight = true;
  };
  const stepLeft = async () => {
    await game.left(x, y);
    x--;
    point.goneLeft = true;
  };

  const getPoint = (pointX, pointY) => {
    return lab.find((e) => e.x === pointX && e.y === pointY);
  };

  while (!(await game.state(x, y)).finish) {
    const state = await game.state(x, y);
    point = getPoint(x, y);
    if (!point) {
      lab.push({ x: x, y: y });
      point = getPoint(x, y);
    }

    if (!getPoint(x, y + 1) && state.bottom) {
      await stepDown();
    } else if (!getPoint(x + 1, y) && state.right) {
      await stepRight();
    } else if (!getPoint(x - 1, y) && state.left) {
      await stepLeft();
    } else if (!getPoint(x, y - 1) && state.top) {
      await stepUp();
    } else if (!point.goneBottom && state.bottom) {
      await stepDown();
    } else if (!point.goneRight && state.right) {
      await stepRight();
    } else if (!point.goneLeft && state.left) {
      await stepLeft();
    } else if (!point.goneTop && state.top) {
      await stepUp();
    } else {
      break;
    }
  }

  if ((await game.state(x, y)).finish) {
    console.log(`EXIT x: ${x} y: ${y} :)`);
    return { x: x, y: y };
  }

  console.log(`Exit without success x: ${x} y: ${y} :(`);
  return { x: 0, y: 0 };
}
