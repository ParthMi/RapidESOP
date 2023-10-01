import React, { useEffect, useState } from 'react'
import BaseUrl from '../API/Api'

const FAQs = () => {

    const [faqs, setFaqs] = useState()

    useEffect(() => {
        async function getallfaqs() {
            fetch(BaseUrl + '/faq/all')
                .then((response) => response.json())
                .then((json) => {
                    setFaqs(json)
                    // console.log(json)
                });

        } 
        getallfaqs();
    },[])



    return (
        <div className="google-font p-3">

            <div className="row">
                <div className='col'>
                    <center><img src='https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5185.jpg' width={380} /></center>
                </div>
                <div className='col container p-2' >
                    <p className='fw-bold fs-4'>Frequently asked questions</p>
                    <div className='overflow-auto' style={{ height: "500px" }}>

                        <div class="accordion" id="accordionExample">

                            {faqs?.map((faq,i) => {
                                return (<div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + i} aria-expanded="true" aria-controls="collapseOne">
                                            {faq.question}                                    </button>
                                    </h2>
                                    <div id={"collapseOne" + i} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                        {faq.answer}
                                        </div>
                                    </div>
                                </div>)
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQs
