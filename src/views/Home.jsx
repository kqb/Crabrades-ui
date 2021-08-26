import React from "react";
export default ({ supply, mintAmount, setMintAmount, gasPrice, tx, writeContracts, parseEther }) => {
  return (
    // <Layout style={{ backgroundColor: "transparent" }}>
    //   <Content style={{ padding: "100px 50px" }}>
    //     <Layout className="site-layout-background" style={{ padding: "24px 2rem" }}>
    //       <Content style={{ padding: "0 24px", minHeight: 280 }}>
    //         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    //           <Col span={9}>
    //             <img src="img/typesofcrabs.gif"></img>
    //           </Col>
    //           <Col span={15}>
    //             <h3>
    //               For far too long, humans have slandered the good name of the crab. Naming all the worse things after
    //               us! Even being in a bad mood is called being crabby… Well, we’re fed up with it! The King of Crabs has
    //               sent his son as a herald to usher in a new time of the crab and elevate crabkind to its rightful place
    //               among the stars. Join us, crabrade, as we embark on our mission of liberation of the crustacean
    //               nation. Make the right decision and ally yourself with the noblest cause. Crabs are the ultimate life
    //               form; all things shall one day become crabulous.
    //             </h3>
    //           </Col>
    //         </Row>
    //       </Content>
    //     </Layout>
    //   </Content>
    //   {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    // </Layout>
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img src="img/typesofcrabs.gif" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="mb-5 text-5xl font-bold text-secondary tracking-wide">Commit to the Crabraderie!!</h1>
            <h3 className="mb-5 text-xl font-bold">
              For far too long, humans have slandered the good name of the crab. Naming all the worse things after us!
              Even being in a bad mood is called being crabby… Well, we’re fed up with it!{" "}
            </h3>
            <h3 className="mb-5 text-xl font-bold">
              The King of Crabs has sent his son as a herald to usher in a new time of the crab and elevate crabkind to
              its rightful place among the stars.{" "}
            </h3>
            <h3 className="mb-5 text-xl font-bold">
              Join us, crabrade, as we embark on our mission of liberation of the crustacean nation. Make the right
              decision and ally yourself with the noblest cause.{" "}
            </h3>
            <h3 className="mb-5 text-xl font-bold">
              Crabs are the ultimate life form; all things shall one day become crabulous.
            </h3>

            {/* <button className="btn btn-primary">Get Scuttlin'</button> */}
          </div>
        </div>
      </div>
      ;
      <div className="relative z-10">
        <div className="pt-10 pb-20 hero bg-gradient-to-br from-base-100 to-base-300 text-base-content">
          <div className="grid max-w-screen-sm max-w-screen-xl gap-4 mb-48 -mt-48 xl:pb-0 bg-opacity-60 glass xl:rounded-box text-base-content">
            <div className="px-2 pt-2">
              <div className="space-x-1 navbar rounded-box text-primary-content">
                <div className="flex-1 px-2 mx-2 md:flex justify-center md:justify-start">
                  <h3 className="text-2xl text-secondary font-title tracking-wide">Mint Your Crabrade</h3>
                </div>{" "}
              </div>
            </div>{" "}
            <div
              id="component-demo"
              className="flex items-center w-full grid-flow-row grid-cols-6 md:grid-cols-8 gap-4 px-10 pt-1 pb-10 overflow-x-scroll overflow-y-hidden xl:px-4 xl:overflow-x-hidden xl:overflow-x-auto "
            >
              {/* <div className="overflow-visible shadow-xl card bg-base-100  flex-shrink-0 col-span-9 row-span-4 mx-2 xl:mx-0 w-auto"> */}
                {/* <div className="card-body">
                  <div className="flex items-center font-extrabold card-title">
                    Crabrade Minting!
                    <div className="dropdown dropdown-top dropdown-end">
                      <div tabIndex={0}>
                        <div tabIndex={0} className="inline-block mx-1 btn btn-circle btn-ghost btn-xs text-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline w-5 h-5 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>{" "}
                      <div tabIndex={0} className="py-2 dropdown-content">
                        <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                          <div className="card-body">
                            <h2 className="font-extrabold capitalize card-title">dropdown component</h2>{" "}
                            <p className="text-sm text-neutral-content text-opacity-80">
                              helper dropdown can show an element when focused.
                            </p>{" "}
                            <div className="flex justify-end mt-4">
                              <a href="/components/dropdown" className="btn btn-primary btn-sm xl:btn-md">
                                See component
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div tabIndex={0}>
                      <div className="p-10 card bg-base-200">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Amount</span>
                          </label>
                          <input type="text" placeholder="1" className="input" />
                        </div>
                      </div>
                    </div>{" "}
                    <input type="range" min={1} max={50} defaultValue={5} className="range" />
                  </div>{" "}
                  <p className="text-sm text-base-content text-opacity-80">
                    You can mint up to 50 CRABs per transaction!
                  </p>{" "}
                  <div className="justify-end card-actions">
                    <div className="dropdown dropdown-top dropdown-end">
                      <div tabIndex={0}>
                        <button className="btn btn-primary">Mint!</button>
                      </div>{" "}
                      <div tabIndex={0} className="py-2 dropdown-content">
                        <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                          <div className="card-body">
                            <h2 className="font-extrabold capitalize card-title">button component</h2>{" "}
                            <p className="text-sm text-neutral-content text-opacity-80">
                              Buttons come in various shapes, colors and sizes
                            </p>{" "}
                            <div className="flex justify-end mt-4">
                              <a href="/components/button" className="btn btn-primary btn-sm xl:btn-md">
                                See component
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
              {/* <div className="overflow-visible shadow-xl card bg-base-100 flex-shrink-0 col-span-6 md:col-span-8  row-span-4 mx-2 xl:mx-0 w-72 xl:w-auto"> */}
                <div className="card-body">
                  <div className="flex items-center font-extrabold card-title">Crabrade Minting!</div>{" "}
                  <div className="w-full">
                    <div tabIndex={0}>
                      <div className="p-10 card bg-base-200">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Amount</span>
                          </label>
                          <input
                            type="text"
                            value={mintAmount}
                            onChange={e => setMintAmount(e.target.value)}
                            className="input"
                          />
                        </div>
                      </div>
                    </div>{" "}
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={mintAmount}
                      onChange={e => setMintAmount(e.target.value)}
                      className="range"
                    />
                  </div>{" "}
                  <p className="text-sm text-base-content text-opacity-80">
                    You can mint up to 50 CRABs per transaction!
                  </p>{" "}
                  <div className="justify-start card-actions">
                    <h3>Mint Price: {"0.02 ETH"}</h3>
                  </div>
                  <div className="justify-end card-actions">
                    <div tabIndex={0}>
                      <button
                        onClick={() => {
                          console.log("gasPrice,", gasPrice);
                          tx(writeContracts.Crabrades.adopt(mintAmount, { value: parseEther("" + mintAmount * 0.02) }));
                        }}
                        className="btn btn-primary"
                      >
                        Mint!
                      </button>
                    </div>{" "}
                  </div>
                </div>
              {/* </div> */}
              {/* <div className="card overflow-visible shadow-lg bg-base-100 flex-shrink-0 col-span-3 row-span-1 mx-2 xl:mx-0 w-72 xl:w-auto xl:place-self-stretch">
                <div className="grid gap-4 flex-shrink-0 col-span-3 row-span-1 mx-2 xl:mx-0 w-72 xl:w-auto">
                  <div className="flex items-center p-4 shadow-xl rounded-box bg-accent text-accent-content">
                    <div className="flex-1 px-2">
                      <h2 className="text-3xl font-extrabold">4,600</h2>{" "}
                      <p className="text-sm text-opacity-80">Page views</p>
                    </div>{" "}
                    <div className="flex-0">
                      <div className="dropdown dropdown-top dropdown-end">
                        <div tabIndex={0}>
                          <div className="flex space-x-1">
                            <button className="btn btn-ghost btn-square" aria-label="button component">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                              >
             
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="btn btn-ghost btn-square" aria-label="button component">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div tabIndex={0} className="py-2 dropdown-content">
                          <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                            <div className="card-body">
                              <h2 className="font-extrabold capitalize card-title">button component</h2>{" "}
                              <p className="text-sm text-neutral-content text-opacity-80">
                                Buttons come in various shapes, colors and sizes
                              </p>
                              <div className="flex justify-end mt-4">
                                <a href="/components/button" className="btn btn-primary btn-sm xl:btn-md">
                                  See component
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-row items-center px-4 space-x-4 card-body">
                  <div className="flex-1">
                    <h2 className="flex mb-0 card-title">
                      <div className="dropdown dropdown-top">
                        <div tabIndex={0}>
                          <button aria-label="loading button" className="btn btn-ghost btn-sm btn-circle loading" />
                        </div>{" "}
                        <div tabIndex={0} className="py-2 dropdown-content">
                          <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                            <div className="card-body">
                              <h2 className="font-extrabold capitalize card-title">loading button component</h2>{" "}
                              <p className="text-sm text-neutral-content text-opacity-80">
                                Buttons can get loadings state using a simple class
                              </p>
                              <div className="flex justify-end mt-4">
                                <a href="/components/button" className="btn btn-primary btn-sm xl:btn-md">
                                  See component
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      Downloading...
                    </h2>
                    <div className="dropdown w-full dropdown-top">
                      <div tabIndex={0}>
                        <progress value={70} max={100} className="progress progress-secondary" />
                      </div>
                      <div tabIndex={0} className="py-2 dropdown-content">
                        <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                          <div className="card-body">
                            <h2 className="font-extrabold capitalize card-title">progress component</h2>{" "}
                            <p className="text-sm text-neutral-content text-opacity-80">
                              Show progressbar, loadings or simple bar charts using progress component
                            </p>{" "}
                            <div className="flex justify-end mt-4">
                              <a href="/components/progress" className="btn btn-primary btn-sm xl:btn-md">
                                See component
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex-0">
                    <div className="dropdown dropdown-top dropdown-end">
                      <div tabIndex={0}>
                        <button aria-label="circle button component" className="btn btn-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-6 h-6 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div tabIndex={0} className="py-2 dropdown-content">
                        <div className="shadow-xl w-72 card compact bg-neutral-focus text-neutral-content rounded-box">
                          <div className="card-body">
                            <h2 className="font-extrabold capitalize card-title">button component</h2>{" "}
                            <p className="text-sm text-neutral-content text-opacity-80">
                              Buttons come in various shapes, colors and sizes
                            </p>
                            <div className="flex justify-end mt-4">
                              <a href="/components/button" className="btn btn-primary btn-sm xl:btn-md">
                                See component
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
          {/* <div className="overflow-hidden">
            <div
              style={{ backgroundImage: "url('img/crab.png')", opacity: "0.1" }}
              className="rounded-full  bg-center -mt-96 xl:mt-0 bg-primary w-96 h-96 bg-opacity-20"
            >
            </div>
          </div> */}
        </div>{" "}
        <div className="flex justify-center w-full -mt-56">
          <div className="stats">
            <div className="gap-0 px-10 bg-transparent stat place-items-center hover:opacity-70">
              <div className="stat-value">{supply}</div> <div className="stat-desc">Already Minted</div>
            </div>{" "}
            <div className="gap-0 px-10 bg-transparent stat place-items-center hover:opacity-70">
              <div className="stat-value">9999</div> <div className="stat-desc">Max Supply</div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-center w-full mt-6">
          <a href="https://opensea.io/collection/crabrades" target="_blank" className="btn btn-primary btn-wide">
            Crabrades on Opensea
          </a>
        </div>
      </div>
      <div className="min-h-screen hero  bg-primary text-neutral-content">
        <div className="max-w-md mx-auto text-center hero-content md:max-w-full">
          <div>
            <h2 className="mt-20 mb-2 text-4xl font-extrabold md:text-6xl tracking-wide text-secondary">Crabmap</h2>{" "}
            <h3 className="mb-5 text-3xl font-bold">Little Crab Big Dreams</h3>{" "}
            <div className="flex flex-col my-20">
              <div className="pb-4">
                <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
                  <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                    <img src="img/crab2.png" className="mask mask-hexagon-2" />
                  </div>
                  <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
                    <div className="container mx-auto w-full h-full">
                      <div className="relative wrap overflow-hidden p-10 h-full">
                        <div
                          className="border-2-2 border-yellow-555 absolute h-full border"
                          style={{ right: "50%", border: "2px solid #FFC100", borderRadius: "1%" }}
                        />
                        <div
                          className="border-2-2 border-yellow-555 absolute h-full border"
                          style={{ left: "50%", border: "2px solid #FFC100", borderRadius: "1%" }}
                        />
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">
                              Get Discord Nitro so the cool crabs stop making fun of me
                            </h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1  w-5/12 px-1 py-4 text-left">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">
                              Gallery Section that displays the greatness of crabkind Site improvements{" "}
                            </h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">Ranking/Rarity Feature</h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1  w-5/12 px-1 py-4">
                            <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">
                              Give away to early minters/Shiller contest
                            </h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">Aquatic Tank Decorator</h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1  w-5/12 px-1 py-4">
                            <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Interactive Beach </h4>
                          </div>
                        </div>

                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">Social Crab Beach</h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1  w-5/12 px-1 py-4">
                            <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Crab Jazz </h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">Crab Merchant</h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1  w-5/12 px-1 py-4">
                            <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Crab Blog </h4>
                          </div>
                        </div>
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                          <div className="order-1 w-5/12" />
                          <div className="order-1 w-5/12 px-1 py-4 text-right">
                            <h4 className="mb-3 font-bold text-lg md:text-2xl">
                              Crab overlords spare the lives of inferior beings
                            </h4>
                          </div>
                        </div>
                      </div>
                      {/* <img
                        className="mx-auto -mt-36 md:-mt-36"
                        src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section id="faq" className="relative overflow-hidden  z-10 bg-gradient-to-br from-primary to-secondary">
        <div className="z-10 min-h-screen text-primary-content">
          <div className="mx-auto py-20 flex-col w-full text-center md:max-w-2xl">
            <div className="w-full">
              <h2 className="mt-20 mb-2 text-4xl font-extrabold text-white  md:text-6xl">FAQ</h2>
            </div>
          </div>
          <div className="text-black md:scale-90 container pb-40 mx-auto px-4 md:px-12">
            <div className="card glass lg:card-side text-neutral-content">
              <div className=" card-body">
                <ul className="accordion list-reset mb-0 text-black">
                  <li className="is-active">
                    <div className="accordion-header  text-xl font-extrabold mb-2">
                      <span className="h6 m-0">Why is this rug-proof?</span>
                      <div className="accordion-icon" />
                    </div>
                    <div className="accordion-content mb-2" style={{ maxHeight: "44px" }}>
                      <div className="   mb-4 text-lg ">Ownership renounced and liquidity is locked via Unicrypt.</div>
                    </div>
                  </li>
                  <li className>
                    <div className="accordion-header  text-xl font-extrabold mb-2">
                      <span className="h6 m-0">How are charities decided?</span>
                      <div className="accordion-icon" />
                    </div>
                    <div className="accordion-content mb-2">
                      <div className="   mb-4 text-lg ">
                        <h2>
                          To start, we’re working alongside several charities to onboard them onto The Giving Block in
                          order to receive donations in cryptocurrencies.{" "}
                        </h2>{" "}
                        <br />
                        <h2>
                          As the project grows, we plan to implement a voting feature for all holders and feel free to
                          recommend causes to us through any of our social media channels.
                        </h2>
                      </div>
                    </div>
                  </li>
                  <li className>
                    <div className="accordion-header  text-xl font-extrabold mb-2">
                      <span className="h6 m-0">Men are victims too, don't you care about them?</span>
                      <div className="accordion-icon" />
                    </div>
                    <div className="accordion-content mb-2">
                      <div className="   mb-4 text-lg ">
                        <h2>Yes, men are also victims of domestic violence and that is unacceptable.</h2>
                        <br />
                        <h2>
                          The major challenges facing male victims of domestic abuse are social stigma and double
                          standards in law enforcement.
                        </h2>
                        <br />
                        <h2>We believe these issues are best addressed through awareness and empathy.</h2>
                        <br />
                        <h2>
                          Women are disproportionately victims of domestic violence, and in many communities women face
                          a different standard of property ownership, rendering them economic hostages in their own
                          homes.
                        </h2>
                        <br />
                        <h2>
                          We believe we can best address these issues by providing these marginalized women with some
                          sort of safety net and safe haven.
                        </h2>
                        <br />
                        <h2>Niceguys allocates donations to causes that work to help victims of all genders.</h2>
                      </div>
                    </div>
                  </li>
                  <li className>
                    <div className="accordion-header  text-xl font-extrabold mb-2">
                      <span className="h6 m-0">Is this a charity or utility token?</span>
                      <div className="accordion-icon" />
                    </div>
                    <div className="accordion-content mb-2">
                      <div className="   mb-4 text-lg ">It's a utility token, but a socially responsible one. </div>
                    </div>
                  </li>
                  <li className>
                    <div className="accordion-header  text-xl font-extrabold mb-2">
                      <span className="h6 m-0">What is the token address?</span>
                      <div className="accordion-icon" />
                    </div>
                    <div className="accordion-content mb-2">
                      <div className="   mb-4 text-lg ">0x0cbedf181b230005216e3665eb9e521358939390</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:scale-90 container pb-40 mx-auto px-4 md:px-12" />
        </div>
      </section> */}
      <footer style={{background:"rgb(233, 217, 180)"}} className="p-10 footer text-primary-content footer-center">
        <div>
          <img style={{height:"200px", width:"auto"}} src="/img/crabradeslogoglow.png" />
          <p className="font-bold">Crabrades</p>
          <p>Copyright © 2021 - All right reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <div style={{ margin: "auto", width: "100%" }} className="navSocial">
              <ul>
                <li>
                  <a target="_blank" href="https://twitter.com/Crabrades">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="twitter"
                      className="svg-inline--fa fa-twitter fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      />
                    </svg>
                  </a>
                  <span className="tooltiptext">Twitter</span>
                </li>
                <li>
                  <a target="_blank" href="https://www.instagram.com/crabrades/">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="instagram"
                      className="svg-inline--fa fa-instagram fa-w-14 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      />
                    </svg>
                  </a>
                  <span className="tooltiptext">Instagram</span>
                </li>
                <li>
                  <a target="_blank" href="https://discord.gg/BxKYxNT8JS">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="discord"
                      className="svg-inline--fa fa-discord fa-w-20 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                      />
                    </svg>
                  </a>
                  <span className="tooltiptext">Discord</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>{" "}
    </>
  );
};
