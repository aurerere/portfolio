import config from "@/config.json";

export default function githubApp() {
    window.open(config.github, "_blank");
    return "ok";
}