import React, { useState } from "react";
import FaceCreator from "../util/FaceCreator";
import "./AvatarMaker.css";

const AvatarMaker = () => {
  const [avatarSettings, setAvatarSettings] = useState({
    height: 300,
    width: 300,
    hair: 1, //From 0 to 9
    hairFill: "#000000",
    hairStroke: "#131313",
    skinBorder: "#000000",
    skinColor: "#c39582",
    shirt: 1, //From 0 to 7
    shirtFill: "#af2525",
    shirtStroke: "#00ff00",
    shirtDesign: "#ffffff",
    mouth: 1, //From 0 to 6
    mouthFill: "#ff2993",
    nose: 2, //From 0 to 7
    eye: 1, //From 0 to 4
    eyebrow: 1, //From 0 to 5
    accessory: 1, //From 0 to 3
    accessoryStroke: "#7608fe",
  });

  const handleSettingsChange = (key, value) => {
    setAvatarSettings({ ...avatarSettings, [key]: value });
  };

  return (
    <div className="avatar-maker-container">
      <div className="avatar-maker-svg-container">
        <div className="avatar-maker-svg">
          <FaceCreator {...avatarSettings} />
        </div>
      </div>
      <div className="avatar-maker-settings-container">
        <div className="avatar-maker-setting">
          <label>Hair</label>
          <input
            type="range"
            min={0}
            max={9}
            value={avatarSettings.hair}
            onChange={(e) =>
              handleSettingsChange("hair", parseInt(e.target.value))
            }
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Hair Outline</label>
          <input
            type="color"
            value={avatarSettings.hairStroke}
            onChange={(e) => handleSettingsChange("hairStroke", e.target.value)}
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Hair Color</label>
          <input
            type="color"
            value={avatarSettings.hairFill}
            onChange={(e) => handleSettingsChange("hairFill", e.target.value)}
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Skin Color</label>
          <input
            type="color"
            value={avatarSettings.skinColor}
            onChange={(e) => {
              handleSettingsChange("skinColor", e.target.value);
            }}
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Nose</label>
          <input
            type="range"
            min={0}
            max={7}
            value={avatarSettings.nose}
            onChange={(e) =>
              handleSettingsChange("nose", parseInt(e.target.value))
            }
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Mouth</label>
          <input
            type="range"
            min={0}
            max={6}
            value={avatarSettings.mouth}
            onChange={(e) =>
              handleSettingsChange("mouth", parseInt(e.target.value))
            }
          />
        </div>

        {(avatarSettings.mouth === 3 ||
          avatarSettings.mouth === 4 ||
          avatarSettings.mouth === 5) && (
          <div className="avatar-maker-setting">
            <label>Mouth Color</label>
            <input
              type="color"
              value={avatarSettings.mouthFill}
              onChange={(e) => {
                handleSettingsChange("mouthFill", e.target.value);
              }}
            />
          </div>
        )}

        <div className="avatar-maker-setting">
          <label>Eyebrow</label>
          <input
            type="range"
            min={0}
            max={5}
            value={avatarSettings.eyebrow}
            onChange={(e) =>
              handleSettingsChange("eyebrow", parseInt(e.target.value))
            }
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Eye</label>
          <input
            type="range"
            min={0}
            max={4}
            value={avatarSettings.eye}
            onChange={(e) =>
              handleSettingsChange("eye", parseInt(e.target.value))
            }
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Cloth</label>
          <input
            type="range"
            min={1}
            max={7}
            value={avatarSettings.shirt}
            onChange={(e) =>
              handleSettingsChange("shirt", parseInt(e.target.value))
            }
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Shirt Color</label>
          <input
            type="color"
            value={avatarSettings.shirtFill}
            onChange={(e) => {
              handleSettingsChange("shirtFill", e.target.value);
            }}
          />
        </div>

        <div className="avatar-maker-setting">
          <label>Shirt Outline</label>
          <input
            type="color"
            value={avatarSettings.shirtStroke}
            onChange={(e) => {
              handleSettingsChange("shirtStroke", e.target.value);
            }}
          />
        </div>

        {(avatarSettings.shirt === 1 || avatarSettings.shirt === 5) && (
          <div className="avatar-maker-setting">
            <label>Shirt Design</label>
            <input
              type="color"
              value={avatarSettings.shirtDesign}
              onChange={(e) => {
                handleSettingsChange("shirtDesign", e.target.value);
              }}
            />
          </div>
        )}

        <div className="avatar-maker-setting">
          <label>Accessory</label>
          <input
            type="range"
            min={0}
            max={3}
            value={avatarSettings.accessory}
            onChange={(e) =>
              handleSettingsChange("accessory", parseInt(e.target.value))
            }
          />
        </div>

        {avatarSettings.accessory !== 0 && (
          <div className="avatar-maker-setting">
            <label>Accessory Color</label>
            <input
              type="color"
              value={avatarSettings.accessoryStroke}
              onChange={(e) => {
                handleSettingsChange("accessoryStroke", e.target.value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarMaker;
