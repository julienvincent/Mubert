const rand = max => Math.floor(Math.random() * max);

export default targetBeat => {
    const Beats = [
        1225,
        1400,
        1440,
        1500,
        1750,
        600
    ]
    const Tones = [
        "C",
        "F"
    ]

    targetBeat = targetBeat || Beats[rand(Beats.length)]
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