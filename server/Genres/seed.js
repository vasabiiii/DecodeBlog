const Genres = require('./genres')

const data = [
    'Прогнозы в мире игр',
    'Веб-разработка',
    'Рецензия игр',
    'Прохождения',
    'Алгоритмы',
    'Тестирование игр',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект'
    
]

async function writeDataGenre(){
    const length = await Genres.count()
    if(length ==0){
        data.map((item, index) =>{
            new Genres({
                name:item,
                key: index
            }).save()
        })
    }
}
module.exports = writeDataGenre