const rand = max => Math.floor(Math.random() * max);

const Beats = [
    {name: "AMBIENT", icon: "g", beat: 600},
    {name: "PSYTRANCE", icon: "c", beat: 1440},
    {name: "CHILLSTEP", icon: "a", beat: 1400},
    {name: "LIQUIDFUNK", icon: "e", beat: 1750},
    {name: "DEEPHOUSE", icon: "b", beat: 1225},
    {name: "TRAP", icon: "d", beat: 1500},
]
export const getGenres = () => Beats

export default targetBeat => {
    const Tones = [
        "C",
        "F"
    ]

    targetBeat = targetBeat || Beats[rand(Beats.length)].beat
    const Port = targetBeat == 1750 || targetBeat == 600 ? 49994 : 49995

    let Tone = Tones[rand(Tones.length)]
    if (targetBeat == 1400) {
        Tone = 'D'
    } else if (targetBeat == 1750) {
        Tone = 'Cmin'
    }
    else if (targetBeat == 600) {
        Tone = 'C'
    }

    const URL = 'http://mubert.com:' + Port + '/' + targetBeat + '_' + Tone + '_mp3'
    return URL
}