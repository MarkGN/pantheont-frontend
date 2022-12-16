import Skill from "./Skill";

const skills = "athletics,fight,knowledge,magic,stealth,vigilance".split(",")


export default function Skills() {
  return <div className="card-holder content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
  <div className="card-interior attr">
    {skills.map((skill,ix) => {
      return <Skill key={ix} name={skill} />
    })}
  </div>
</div>
}