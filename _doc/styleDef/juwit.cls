%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This   : juwit.cls                                                           %
% Author : Sebastian Faase                                                     %
% Licence: The MIT License (MIT) http://opensource.org/licenses/MIT            %
% About  : template for juwit editor                                           %
% Version: 0.4                                                                 %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% DEFINITIONS
%-------------------------------------------------------------------------------
\def\defaultFontSize#1{\def\@defaultFontSize{#1}}
\def\topSpace#1{\def\@topSpace{#1}}
\def\buttomSpace#1{\def\@buttomSpace{#1}}
\def\leftBoarderSpace#1{\def\@leftBoarderSpace{#1}}
\def\rightBoarderSpace#1{\def\@rightBoarderSpace{#1}}
\def\corporateLogo#1{\def\@corporateLogo{#1}}
\def\corporateLogoSize#1{\def\@corporateLogoSize{#1}}
\newif\if@hasCorporateLogo



% INITIATE DEFINITIONS
%-------------------------------------------------------------------------------
\defaultFontSize{11pt}		% 10pt-12pt
\topSpace{40mm}
\buttomSpace{20mm}
\leftBoarderSpace{25mm}
\rightBoarderSpace{25mm}
\corporateLogo{logo.png}
\corporateLogoSize{60mm}
\@hasCorporateLogotrue


% LaTeX - VERSION
%-------------------------------------------------------------------------------
\NeedsTeXFormat{LaTeX2e}


% CLASS DESCRIPTION
%-------------------------------------------------------------------------------
\ProvidesClass{juwit}[2015/03/02 class file for juwit editor] 


% EXTENDS CLASS ARTICLE
%-------------------------------------------------------------------------------
\LoadClass[\@defaultFontSize]{article}


% PACKAGES
%-------------------------------------------------------------------------------
\RequirePackage{sectsty}					% Better Sections
\RequirePackage{leading}					% Linespacing
\RequirePackage[left = \@leftBoarderSpace,  % < Page geometry
                right = \@rightBoarderSpace,% -
                top = \@topSpace, 			% -
                bottom = \@buttomSpace, 	% -
                headheight=40mm, 			% -
                headsep = 10mm]{geometry}	% >
\RequirePackage[utf8]{inputenc}				% use encoding utf8
\RequirePackage{amsmath}					% amsmath for formulas
\RequirePackage{amsfonts}					% more symbols
\RequirePackage{lmodern}					% replace default font \
\RequirePackage[T1]{fontenc}				% with Latin Modern
\RequirePackage{enumitem}					% better lists
\RequirePackage{graphicx}					% support graphic
\RequirePackage{xcolor}						% support color
\RequirePackage{fancyhdr}					% header/footer
\RequirePackage{lipsum}						% blindtext for testing


% GLOBAL SETTINGS
%-------------------------------------------------------------------------------
\pagestyle{fancy}							% use fancyhdr pagestyle
\setlist[]{parsep=0pt, itemsep=0pt, 		% < itemize and enumerate spacing
           partopsep=0pt, topsep=0pt}		% >
\leading{13.5pt}							% Linespacing
%\sectionfont{\nohang}						% unused
\sectionfont{\fontsize{14.4pt}{1em}			% < define section font
             \selectfont}					% >
\subsectionfont{\fontsize{12pt}{1em}		% < define subsection font
                \selectfont}				% >

\DeclareRobustCommand{\juwit}
  {
    \Large{j\kern-.1em}%
    \small{u\kern-.25em}%
    \LARGE{w\kern-.08em}%
    \small{i\kern-.08em}%
    \Large{t\kern-.1em}%
  }

% ELEMENTS
%-------------------------------------------------------------------------------

% itemize
\setlist[itemize,1]{label=\textbullet}		% < symbol layer 1
\setlist[itemize,2]{label=\textendash}		%   symbol layer 2
\setlist[itemize,3]{label=\guillemotright}	%   symbol layer 3 >

% enumerate
\setlist[enumerate,1]{{label=\arabic*.}}	% < customized enumerate
\setlist[enumerate,2]{{label=\roman*.}}		% -
\setlist[enumerate,3]{{label=				% -
                       \emph{\alph*}.}}		% >

% header
% \setlength\headheight{26pt}				% unused
\if@hasCorporateLogo
\lhead{\includegraphics[width=				% < show corporate logo
  \@corporateLogoSize]{\@corporateLogo}}	% >
\fi
\rhead{NAME\\adress}						% show Author credentials
\renewcommand{\headrulewidth}{0.5pt}		% draw header lineseperator

% footer
\cfoot{Page \thepage}						% show pagenumber centered
\lfoot{creadet with\juwit}									% unused
\rfoot{}									% unused
\renewcommand{\footrulewidth}{0.5pt}		% draw footer lineseperator

