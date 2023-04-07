import { useEffect } from "react";
import { useUpdateHeroMutation } from "../redux/heroApi";
import { setPower, setRemainPower } from "../redux/powerSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Profile } from "../types";

function HeroProfile({ id, profile }: { id: number; profile: Profile }) {
  const dispatch = useAppDispatch();
  const power = useAppSelector((state) => state.power.power);
  const remainPower = useAppSelector((state) => state.power.remainPower);
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();

  useEffect(() => {
    dispatch(setRemainPower(0));
    dispatch(setPower(profile));
  }, [dispatch, profile]);

  const handleClick = ({
    action,
    key,
  }: {
    action: "plus" | "minus";
    key: keyof Profile;
  }) => {
    if (action === "plus" && remainPower <= 0) return;
    if (action === "minus" && power[key] <= 0) return;

    if (action === "plus") {
      dispatch(setPower({ [key]: power[key] + 1 }));
      dispatch(setRemainPower(remainPower - 1));
    }
    if (action === "minus") {
      dispatch(setPower({ [key]: power[key] - 1 }));
      dispatch(setRemainPower(remainPower + 1));
    }
  };

  const hasChanged =
    power.str !== profile.str ||
    power.agi !== profile.agi ||
    power.int !== profile.int ||
    power.luk !== profile.luk;

  const handleUpdateHero = () => {
    if (!hasChanged || isUpdating) return;
    if (remainPower !== 0)
      return window.alert("能力值總和必須與拿到的時候相同");
    if (power.str < 0 || power.int < 0 || power.agi < 0 || power.luk < 0)
      return window.alert("能力值不能小於零");

    updateHero({ id, ...power })
      .unwrap()
      .then(() => {
        window.alert("update Hero successfully");
      })
      .catch((err) => {
        console.error(err.message);
        window.alert("Fail to update Hero");
      });
  };

  return (
    <main>
      <div className="main-wrapper">
        <div className="left">
          <p className="str">
            <span>STR</span>
            <button
              disabled={remainPower <= 0}
              onClick={() => handleClick({ action: "plus", key: "str" })}
            >
              +
            </button>
            <b>{power.str}</b>
            <button
              disabled={power.str <= 0}
              onClick={() => handleClick({ action: "minus", key: "str" })}
            >
              -
            </button>
          </p>
          <p className="int">
            <span>INT</span>
            <button
              disabled={remainPower <= 0}
              onClick={() => handleClick({ action: "plus", key: "int" })}
            >
              +
            </button>
            <b>{power.int}</b>
            <button
              disabled={power.int <= 0}
              onClick={() => handleClick({ action: "minus", key: "int" })}
            >
              -
            </button>
          </p>
          <p className="agi">
            <span>AGI</span>
            <button
              disabled={remainPower <= 0}
              onClick={() => handleClick({ action: "plus", key: "agi" })}
            >
              +
            </button>
            <b>{power.agi}</b>
            <button
              disabled={power.agi <= 0}
              onClick={() => handleClick({ action: "minus", key: "agi" })}
            >
              -
            </button>
          </p>
          <p className="luk">
            <span>LUK</span>
            <button
              disabled={remainPower <= 0}
              onClick={() => handleClick({ action: "plus", key: "luk" })}
            >
              +
            </button>
            <b>{power.luk}</b>
            <button
              disabled={power.luk <= 0}
              onClick={() => handleClick({ action: "minus", key: "luk" })}
            >
              -
            </button>
          </p>
        </div>
        <div className="right">
          <p className="remain">剩餘點數: {remainPower}</p>
          <button
            disabled={!hasChanged || remainPower > 0 || isUpdating}
            onClick={handleUpdateHero}
          >
            {isUpdating ? "更新中" : "儲存"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default HeroProfile;
