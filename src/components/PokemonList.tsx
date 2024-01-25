import React, { useState, useEffect } from 'react'
import { IPokemon, IPokemons, IViewDetail } from '../interface'
interface IProps {
    viewDetail: IViewDetail
    setViewDetail: React.Dispatch<React.SetStateAction<IViewDetail>>,
    name: string,
    image: string,
    id: number,
    abilities?: {
        ability: string
        name: string
    }[] | undefined
}
const PokemonList: React.FC<IProps> = (props) => {
    const { name, image, id, abilities, viewDetail, setViewDetail } = props
    const [selected, setSelected] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const onClose = () => {
        setSelected(false)
    }

    const openDetail = () => {
        setSelected(id === viewDetail?.id)
    }

    // console.log(abilities);


    return (
        <>
            {selected &&
                <div className='fixed mx-auto inset-0 sm:max-h-[40%] max-h-[60%] mt-16 z-50 text-black overflow-y-auto bg-white rounded-xl p-4 max-w-[80%]'>
                    <div className="flex flex-col">
                        <div className="flex sm:flex-row flex-col gap-3 items-center">
                            <div
                                style={{
                                    background: `url(${image}) no-repeat center center / cover`,
                                    // You can adjust the height as needed
                                }}
                                className="w-[12rem] h-[12rem] max-sm:w-[8rem] max-sm:h-[8rem] rounded-full border-2"
                            ></div>
                            <div className="sm:text-5xl text-2xl font-bold text-green-500">{name}</div>
                        </div>
                        <div className="text-black">
                            {/* Map over abilities and display names */}
                            {abilities?.map((ab: any, index: number) => (
                                <div key={index} className="">
                                    <div className="" style={{ backgroundImage: `url('${ab?.ability.url}')` }}></div>
                                    <div className='text-black'><span className='text-lg font-semibold'>Ability {index + 1}:</span> <span className='text-cyan-700 capitalize font-bold text-xl'>{ab?.ability.name}</span></div>

                                </div>
                            ))}
                        </div>
                        <div className="text-black grow items-end flex justify-end" onClick={onClose}>
                            <button className='p-3 text-white rounded-lg bg-gradient-to-bl from-red-400 to-yellow-300'>Close</button>
                        </div>


                    </div>
                </div>
            }
            <div className="hover:duration-200 hover:scale-105 cursor-pointer" onClick={openDetail}>
                <div
                    style={{
                        background: `url(${image}) no-repeat center center / cover`,
                        height: '12rem', // You can adjust the height as needed
                    }}
                    className=" "
                ></div>
                <div className="text-center text-xl font-bold">{name}</div>
            </div>
        </>
    )
}

export default PokemonList
