on run argv

  set fileName to item 1 of argv

	set currentDirectory to do shell script "pwd"
	set midiFilePath to currentDirectory & text 2 thru -1 of fileName

	# Open Guitar Pro
	tell application "Guitar Pro 8"
		# Open Guitar Pro
		activate
		open midiFilePath
		delay 2.5
	end tell

	# set instrument
	tell application "System Events"
		tell process "Guitar Pro 8"
			click button "000 Acoustic Grand Piano" of sheet 1 of window 1
			delay 0.5
			click checkbox "Stringed" of window 1
			delay 0.5
			click button "OK" of group of window 1
			delay 0.5
			click button "Import" of group 1 of sheet 1 of window 1
			delay 1
		end tell
	end tell


	# export to wav
	-- tell application "Guitar Pro 8" to activate

	tell application "System Events"
		tell process "Guitar Pro 8"
			click menu item "audio..." of menu 1 of menu item "export" of menu "File" of menu bar 1
			click button "Export" of group 1 of sheet 1 of window 1
			delay 1
			keystroke "/"
			delay 1
			keystroke midiFilePath
			delay 1
			keystroke (ASCII character 8) # backspace
			delay .5
			keystroke (ASCII character 8) # backspace
			delay .5
			keystroke (ASCII character 8) # backspace
			delay .5
			keystroke "wav"
			delay 1
			keystroke return
			delay 1
			keystroke return
			delay 2.5
		end tell
	end tell

	# close Guitar Pro
	try
		tell application "Guitar Pro 8" 
			quit
			delay 2.5
		end tell
	on error errorMessage number errorNumber
		# do nothing
		delay 2.5
	end try

end run