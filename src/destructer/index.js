import { isJumping, CURRENT_JUMP_FORCE, JUMP_FORCE } from "../../config";

const destroyAllAssets = () => {
  destroyAll("dangerousLeft");
  destroyAll("dangerousRight");
  destroyAll("brick");
  destroyAll("coin");
  destroyAll("coin-surprise");
  destroyAll("mushroom-surprise");
  destroyAll("unboxed");
  destroyAll("pipe");
  destroyAll("mushroom");
  destroyAll("bouncer");
  destroyAll("blueBlock");
  destroyAll("coin-surprise");
  destroyAll("blue-steel");
  destroyAll("cloudsOne");
  destroyAll("cloudsTwo");
  destroyAll("cloudsThree");
  destroyAll("boss");
  destroyAll("kamina");
  CURRENT_JUMP_FORCE = JUMP_FORCE;
  isJumping = true;
};

export { destroyAllAssets };
