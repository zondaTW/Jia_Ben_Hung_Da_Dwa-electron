var grunt = require('grunt');

grunt.config.init({
    pkg: grunt.file.readJSON('./Jia_Ben_Hung_Da_Dwa/package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: './Jia_Ben_Hung_Da_Dwa/Jia_Ben_Hung_Da_Dwa-win32-x64',
            outputDirectory: './Jia_Ben_Hung_Da_Dwa/installer64',
            authors: 'zonda',
            title: 'Jia_Ben_Hung_Da_Dwa',
            exe: 'Jia_Ben_Hung_Da_Dwa.exe',
            description: 'Jia_Ben_Hung_Da_Dwa',
            noMsi: true,
            loadingGif: 'icon/chef.ico',
            setupIcon: 'icon/chef.ico',
            icon: 'icon/chef.ico',
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);