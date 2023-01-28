const deploy = async ({ deployments, getNamedAccounts, ethers }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    const timeLockContract = await ethers.getContract("TimeLock", deployer);
    const governanceTokenContract = await ethers.getContract("GovernanceToken", deployer);

    const governorDeployTx = await deploy("DAOGovernor", {
        from: deployer,
        args: [governanceTokenContract.address, timeLockContract.address],
        log: true,
        waitConfirmations: 1
    });

    log("DAO Governor contract adress: ", governorDeployTx.address);
}

module.exports = deploy;
deploy.tags = ['all', 'GovernanceToken']