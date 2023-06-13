import './Help.css'
import {IHelp, IHelpSelect} from "../../utils/types/help.types";
import {BaseSyntheticEvent, useCallback, useEffect, useState} from "react";

const maps: IHelp[] = [
    {
        city: 'Aktobe',
        type: 'Clinic',
        data: {
            name: 'Mediker',
            phone: '7-777-777-77-77',
            description: 'Good',
            address: 'Zhubanov st. 609'
        }
    },
    {
        city: 'Almaty',
        type: 'Doctor',
        data: {
            name: 'Ivan Ivanov',
            phone: '7-777-123-12-12',
            description: 'Perfect',
            address: 'Abay st. 50/2'
        }
    },
    {
        city: 'Astana',
        type: 'Clinic',
        data: {
            name: 'Vision Ltd.',
            phone: '123-123-3232',
            description: 'Good',
            address: 'Orbita-3, 77'
        }
    }
]

const Help = () => {
    const [selectedData, setSelectedData] = useState<IHelpSelect>({city: 'Aktobe', type: 'clinic'})
    const [selectedRes, setSelectedRes] = useState<IHelp>()

    useEffect(() => {
        setSelectedRes(maps.find(el => selectedData.city === el.city))
    }, [selectedData])

    const setSelectData = useCallback((name: keyof IHelpSelect) => (ev: BaseSyntheticEvent) => {
        setSelectedData(prev => ({...prev, [name]: ev.target.value}))
    }, [])

    return <div className="help">
        <h2 className="help__title">
            Соединяем тебя с помощью в твоем городе!
        </h2>
        <div className="help__selectors">
            <div className="help__select__block">
                <label htmlFor="city" className="help__select__label">Выберите свой город:</label>
                <select name="city" id="city" className="help__select"
                        onChange={setSelectData('city')}>
                    <option value="Aktobe" selected>Aktobe</option>
                    <option value="Almaty">Almaty</option>
                    <option value="Astana">Astana</option>
                </select>
            </div>
            <div className="help__select__block">
                <label htmlFor="direction" className="help__select__label">Выберите направление:</label>
                <select name="direction" id="direction" className="help__select"
                        onChange={setSelectData('type')}>
                    <option value="Clinic" selected>Clinic</option>
                    <option value="Doctor">Doctor</option>
                </select>
            </div>
        </div>
        <p className="help__result__text">Результаты в городе {selectedData.city} по направлению {selectedData.type}</p>
        <div className="help__result__list">
            <div className="help__result__card">
                <h3 className="help__result__card__location">{selectedRes?.data.name}</h3>
                <a href="tel:+77007777777" className="help__result__card__phone">{selectedRes?.data.phone}</a>
                <p className="help__result__card__description">Описание: {selectedRes?.data.description}</p>
                <ul className="help__result__bullet">
                    <li className="help__result__media">{selectedRes?.data.address}</li>
                </ul>
            </div>
        </div>
    </div>
}

export default Help;
