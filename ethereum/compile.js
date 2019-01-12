const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Remove contents of build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Compile contracts
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Ensure build folder exists
fs.ensureDirSync(buildPath);

// Add compiled files to build folder
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}