%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Author : Sebastian Faase                                          %
% Licence: The MIT License (MIT) http://opensource.org/licenses/MIT %
% About  : template for juwit editor                                %
% Version: 0.4                                                      %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% VAR
\def\defaultFontSize#1{\def\@defaultFontSize{#1}}
\def\topSpace#1{\def\@topSpace{#1}}
\def\buttomSpace#1{\def\@buttomSpace{#1}}
\def\leftBoarderSpace#1{\def\@leftBoarderSpace{#1}}
\def\rightBoarderSpace#1{\def\@rightBoarderSpace{#1}}

% INIT
\defaultFontSize{11pt}		% 10pt-12pt
\topSpace{40mm}
\buttomSpace{20mm}
\leftBoarderSpace{25mm}
\rightBoarderSpace{25mm}


% LaTeX version
\NeedsTeXFormat{LaTeX2e}

% Class description
\ProvidesClass{juwit}[2015/03/02 class file for juwit editor] 

% based on article styled class with \normalsize \defaultFontSize
\LoadClass[\@defaultFontSize]{article}

% Better Sections
\RequirePackage{sectsty}

% Linespacing
\RequirePackage{leading}

% page setup
\RequirePackage[left = \@leftBoarderSpace, right = \@rightBoarderSpace, top = \@topSpace, bottom = \@buttomSpace, headheight=40mm, headsep = 10mm]{geometry}

% use encoding utf8
\RequirePackage[utf8]{inputenc}

% amsmath for better looking formulas
\RequirePackage{amsmath}

% more symbols
%\RequirePackage{amsfonts}

% replace default font with Latin Modern
\RequirePackage{lmodern}
\RequirePackage[T1]{fontenc}

% better lists
\RequirePackage{enumitem}

% support pictures
\RequirePackage{graphicx}
\RequirePackage{xcolor}
\RequirePackage{color}
\RequirePackage{pifont}

% blindtext for testing
\RequirePackage{lipsum}

% header/footer
\RequirePackage{fancyhdr}
\pagestyle{fancy}

% Header/Footer
%\setlength\headheight{26pt}
\lhead{\includegraphics[width=80mm]{logo1.png}}
\rhead{NAME\\adress}
\cfoot{Page \thepage}
\lfoot{left}
\rfoot{right}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\footrulewidth}{0.5pt}

% customized itemize
\setlist[]{parsep=0pt, itemsep=0pt, partopsep=0pt, topsep=0pt}
\setlist[itemize,1]{label=\textbullet}
\setlist[itemize,2]{label=\textendash}
\setlist[itemize,3]{label=\guillemotright} %\guilsinglright

% customized enumerate
\setlist[enumerate,1]{{label=\arabic*.}}
\setlist[enumerate,2]{{label=\roman*.}}
\setlist[enumerate,3]{{label=\emph{\alph*}.}}

% Linespacing
\leading{13.5pt}

% Sections
%\sectionfont{\nohang}
\sectionfont{\fontsize{14.4pt}{1em}\selectfont}
\subsectionfont{\fontsize{12pt}{1em}\selectfont}
