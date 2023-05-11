
import React from "react";
import { css } from "@emotion/react";
import img1 from "../src/pages/images/S_AniTrimVideo.png"

const ResourceContent = () => {

    const resources = [
        [{ name: "Private Slack", img: img1 }, { name: "Community forums", img: img1 }],
        [{ name: "Blogs", img: img1 }, { name: "Code samples", img: img1 }],
        [{ name: "Roadmap", img: img1 }, { name: "Changelog", img: img1 }]
    ]

    return (
        <>
            <section
                css={css`
                display:flex;
                flex-direction:column;
                align-items:center;
                margin-bottom:5%;
                `}
            >
                {resources.map((resource) => {
                    return (
                        <div
                            css={css`
                            display:flex;
                            width:27%;
                            margin:auto;
                            gap:2%;

                            @media screen and (min-width:768px) and (max-width:1024px){
                                width:70% !important;
                            }

                            @media screen and (min-width:320px) and (max-width:767px){
                                width:70% !important;
                                flex-direction:column;
                            }
                        `}
                        >
                            {resource.map((data) => {
                                return (
                                    <div
                                        css={css`
                                            display:flex;
                                            width:50%;
                                            gap:5%;
                                            margin: 2% 0;

                                            @media screen and (min-width:320px) and (max-width:767px){
                                                width:100% !important;
                                            }

                                            `}
                                    >
                                        <img src={data.img} alt={`${data.name}`} />
                                        <div
                                            css={css`
                                            display:flex;
                                            justify-content:center;
                                            align-items: center;
                                            font-size: 20px;
                                            `}
                                        >{data.name}</div>
                                    </div>
                                )
                            })}

                        </div>

                    )
                })}
            </section>
        </>
    )
}


export default ResourceContent;