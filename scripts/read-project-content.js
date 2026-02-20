const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const CONFIG = {
  // Output file where the entire context will be written
  OUTPUT_FILE: 'project_content.txt',
  // File extensions to include
  INCLUDE_EXTENSIONS: ['.js', '.ts', '.json', '.html', '.css', '.scss'],
  // Folders to EXCLUDE (essential for node_modules, .git, etc.)
  EXCLUDE_DIRS: [],
};

let outputContent = '';

/**
 * Recursively processes a directory.
 * @param {string} dirPath - Path to the current directory.
 */
function processDir(params) {
  try {
    const items = fs.readdirSync(params.dirPath);

    for (const item of items) {
      const fullPath = path.join(params.dirPath, item);
      const stat = fs.statSync(fullPath);
      const relativePath = path.relative(params.projectRoot, fullPath);

      // 2. Recurse for directories
      if (stat.isDirectory()) {
        processDir({ ...params, dirPath: fullPath });
      }
      // 3. Process files
      else if (stat.isFile()) {
        const ext = path.extname(item);

        if (CONFIG.INCLUDE_EXTENSIONS.includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Format the output
            outputContent += `// File: ${relativePath}\n`;
            outputContent += `// ----------------------------------------------------------------------\n`;
            outputContent += content;
            outputContent += '\n\n';
          } catch (e) {
            // Catch read errors (e.g., binary files)
            outputContent += `// !!! FILE READ ERROR (${relativePath}): ${e.message} !!!\n\n`;
          }
        }
      }
    }
  } catch (error) {
    // Catch directory access errors
    console.error(`Error processing directory ${params.dirPath}: ${error.message}`);
  }
}

// --- MAIN EXECUTION LOGIC ---
const projectRoot = __dirname;
const dirPath = path.join(projectRoot, '..', 'coffee-machine', 'hex');
console.log(dirPath);
console.log(`🚀 Starting context gathering...`);
console.log(`DIR: ${dirPath}`);
processDir({ dirPath, projectRoot });

try {
  fs.writeFileSync(CONFIG.OUTPUT_FILE, outputContent, 'utf8');

  // Output statistics
  const fileSize = fs.statSync(CONFIG.OUTPUT_FILE).size;
  console.log(
    `\n✅ Context successfully gathered in file: ${CONFIG.OUTPUT_FILE}`
  );
  console.log(`Total size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
} catch (error) {
  console.error(
    `\n❌ A critical error occurred while writing the file: ${error.message}`
  );
}


