import React from 'react';
import Modal from '../modal';
import AddTransaction from './addtransaction';


  export default function Transactions( ) {
    //Save Transaction
    //Fetch transactions
  return (
    <div>
        <div className="card lg:card-side bg-base-300 shadow-xl w-full mb-4">
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">Recent Transactions</h2>
                    <Modal id="addTransaction" title ="Add Transaction" data={<AddTransaction/>}/>
                </div>
                
                <div className="overflow-x-auto">
                    <div className="h-96 overflow-y-auto">
                        <table className="table table-md table-pin-rows table-pin-cols">
                            <thead>
                            <tr>
                                <td>Title</td> 
                                <td>Type</td> 
                                <td>Price</td> 
                                <td>Date</td> 
                            </tr>
                            </thead> 
                            <tbody className=" overflow-scroll h-40 ">
                            <tr>
                                <td>Cy Ganderton</td> 
                                <td>Quality Control Specialist</td> 
                                <td>Littel, Schaden and Vandervort</td> 
                            </tr>
                            <tr>
                                <td>Hart Hagerty</td> 
                                <td>Desktop Support Technician</td> 
                                <td>Zemlak, Daniel and Leannon</td> 
                            </tr>
                            <tr>
                                <td>Brice Swyre</td> 
                                <td>Tax Accountant</td> 
                                <td>Carroll Group</td> 
                            </tr>
                            <tr>
                                <td>Marjy Ferencz</td> 
                                <td>Office Assistant I</td> 
                                <td>Rowe-Schoen</td> 
                            </tr>
                            <tr>
                                <td>Yancy Tear</td> 
                                <td>Community Outreach Specialist</td> 
                                <td>Wyman-Ledner</td> 
                            </tr>
                            <tr>
                                <td>Irma Vasilik</td> 
                                <td>Editor</td> 
                                <td>Wiza, Bins and Emard</td> 
                            </tr>
                            <tr>
                                <td>Meghann Durtnal</td> 
                                <td>Staff Accountant IV</td> 
                                <td>Schuster-Schimmel</td> 
                            </tr>
                            <tr> 
                                <td>Sammy Seston</td> 
                                <td>Accountant I</td> 
                                <td>O'Hara, Welch and Keebler</td> 
                            </tr>
                            <tr>
                                <td>Lesya Tinham</td> 
                                <td>Safety Technician IV</td> 
                                <td>Turner-Kuhlman</td> 
                            </tr>
                            <tr>
                                <td>Zaneta Tewkesbury</td> 
                                <td>VP Marketing</td> 
                                <td>Sauer LLC</td> 
                            </tr>
                            <tr>
                                <td>Andy Tipple</td> 
                                <td>Librarian</td> 
                                <td>Hilpert Group</td> 
                            </tr>
                            <tr>
                                <td>Sophi Biles</td> 
                                <td>Recruiting Manager</td> 
                                <td>Gutmann Inc</td> 
                            </tr>
                            <tr> 
                                <td>Florida Garces</td> 
                                <td>Web Developer IV</td> 
                                <td>Gaylord, Pacocha and Baumbach</td> 
                            </tr>
                            <tr>
                                <td>Maribeth Popping</td> 
                                <td>Analyst Programmer</td> 
                                <td>Deckow-Pouros</td> 
                            </tr>
                            <tr>
                                <td>Moritz Dryburgh</td> 
                                <td>Dental Hygienist</td> 
                                <td>Schiller, Cole and Hackett</td> 
                            </tr>
                            <tr>
                                <td>Reid Semiras</td> 
                                <td>Teacher</td> 
                                <td>Sporer, Sipes and Rogahn</td> 
                            </tr>
                            <tr>
                                <td>Alec Lethby</td> 
                                <td>Teacher</td> 
                                <td>Reichel, Glover and Hamill</td> 
                            </tr>
                            <tr>
                                <td>Aland Wilber</td> 
                                <td>Quality Control Specialist</td> 
                                <td>Kshlerin, Rogahn and Swaniawski</td> 
                            </tr>
                            <tr>
                                <td>Teddie Duerden</td> 
                                <td>Staff Accountant III</td> 
                                <td>Pouros, Ullrich and Windler</td> 
                            </tr>
                            <tr>
                                <td>Lorelei Blackstone</td> 
                                <td>Data Coordinator</td> 
                                <td>Witting, Kutch and Greenfelder</td>  
                            </tr>
                            </tbody> 
                            <tfoot>
                            <tr>
                                <td>Title</td> 
                                <td>Type</td> 
                                <td>Price</td> 
                                <td>Date</td> 
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


